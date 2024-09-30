"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user:
        return jsonify({"msg": user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg": [user.serialize() for user in users]}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/signup', methods=['POST'])
def sign_up():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists."}), 400
    
    new_user = User(email=email, password=password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'msg': 'Email y contraseña son requeridos'}), 400

    user = User.query.filter_by(email=email).first()
    
    if user and user.password == password:
        # Crear un token de acceso
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'user': user.serialize(),
            'token': access_token
        }), 200
    
    return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 401

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email }), 200