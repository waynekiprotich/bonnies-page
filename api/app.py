import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from models import db, Memory

app = Flask(__name__)
CORS(app)

database_url = os.getenv("DATABASE_URL", "sqlite:///memories.db")

if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/api/memories", methods=["GET"])
def get_memories():
    memories = Memory.query.order_by(Memory.created_at.desc()).all()
    return jsonify([m.to_dict() for m in memories])


@app.route("/api/memories", methods=["POST"])
def add_memory():
    data = request.get_json()

    if not data or not data.get("author") or not data.get("quote"):
        return jsonify({"error": "author and quote required"}), 400

    memory = Memory(
        author=data["author"],
        quote=data["quote"],
        image_url=data.get("image"),
        is_text_only=not bool(data.get("image"))
    )

    db.session.add(memory)
    db.session.commit()

    return jsonify({
        "message": "Memory added",
        "memory": memory.to_dict()
    }), 201


@app.route("/api/memories/<int:memory_id>", methods=["DELETE"])
def delete_memory(memory_id):
    memory = Memory.query.get(memory_id)

    if not memory:
        return jsonify({"error": "Not found"}), 404

    db.session.delete(memory)
    db.session.commit()

    return jsonify({"message": "Deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)