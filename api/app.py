import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from models import db, Memory

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})
 
database_url = os.getenv("DATABASE_URL")
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url or "sqlite:///memories.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/api/memories", methods=["GET"])
def get_memories():
    """Fetch all shared stories, newest first."""
    memories = Memory.query.order_by(Memory.created_at.desc()).all()
    return jsonify([m.to_dict() for m in memories]), 200


@app.route("/api/memories", methods=["POST"])
def add_memory():
    """Receive a new story and photo from the React form."""
    data = request.get_json()

    if not data or not data.get("author") or not data.get("quote"):
        return jsonify({"error": "Author and quote are required"}), 400

    memory = Memory(
        author=data["author"],
        quote=data["quote"],
        image_url=data.get("image"),
        is_text_only=not bool(data.get("image"))
    )

    db.session.add(memory)
    db.session.commit()

    return jsonify({
        "message": "Memory added to the sanctuary",
        "memory": memory.to_dict()
    }), 201


@app.route("/api/memories/<int:memory_id>", methods=["DELETE"])
def delete_memory(memory_id):
    """Delete a specific memory by its ID."""
    memory = Memory.query.get(memory_id)

    if not memory:
        return jsonify({"error": "Memory not found"}), 404

    db.session.delete(memory)
    db.session.commit()

    return jsonify({"message": "Memory deleted"}), 200


if __name__ == "__main__":
    # Local development server
    app.run(debug=True, port=5000)