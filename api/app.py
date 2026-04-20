import os
import sys
from pathlib import Path

# 1. THE FIX: Tell Python exactly where to find models.py
# This MUST come before "from models import ..."
api_dir = str(Path(__file__).parent)
if api_dir not in sys.path:
    sys.path.append(api_dir)

from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Memory

app = Flask(__name__)

# Standard CORS for Vercel
CORS(app)

# 2. Database Configuration
database_url = os.getenv("DATABASE_URL")
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url or "sqlite:///memories.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

db.init_app(app)

# 3. Create Tables (Supabase will see this on first run)
with app.app_context():
    db.create_all()

@app.route("/api/memories", methods=["GET"])
def get_memories():
    try:
        memories = Memory.query.order_by(Memory.created_at.desc()).all()
        return jsonify([m.to_dict() for m in memories]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/memories", methods=["POST"])
def add_memory():
    data = request.get_json()
    if not data or not data.get("author") or not data.get("quote"):
        return jsonify({"error": "Author and quote are required"}), 400

    try:
        memory = Memory(
            author=data["author"],
            quote=data["quote"],
            image_url=data.get("image"),
            is_text_only=not bool(data.get("image"))
        )
        db.session.add(memory)
        db.session.commit()
        return jsonify({"message": "Success", "memory": memory.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/api/memories/<int:memory_id>", methods=["DELETE"])
def delete_memory(memory_id):
    memory = Memory.query.get(memory_id)
    if not memory:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(memory)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

# Required for Vercel
app.debug = os.environ.get('FLASK_DEBUG') == '1'

if __name__ == "__main__":
    app.run(debug=True, port=5000)