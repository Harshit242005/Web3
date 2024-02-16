# here i would run the main flask application to accept routes and other stuff

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

from Auth import LoginUser, SignupUser


app = Flask(__name__)
CORS(app)
# Define an endpoint to receive data from Vue.js
@app.route('/Login', methods=['POST'])
def Login():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        print('Received data: ', data)

        login_instance = LoginUser(
            publicKey = data.get('publicKey'),
            password = data.get('password')
        )
        if login_instance:
            return jsonify({'status': 200, 'success': True})
        else:
            print('Not been able to login the user')

    except Exception as e:
        # Handle any exceptions that may occur
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})
    

@app.route('/Signup', methods=['POST'])
def Signup():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        print('Received Data:', data)
        # destruct the data and pass in the signup class 
        # Destructure the data and pass it to the Signup class
        signup_instance = SignupUser(
        username=data.get('doc').get('username'),
        gmail=data.get('doc').get('email'),
        dob=data.get('doc').get('dob'),
        contact=data.get('doc').get('contact'),
        password=data.get('doc').get('password'),
        privatekey=data.get('doc').get('privatekey'),
        publickey=data.get('doc').get('publickey')
        )

        # if the return type is true
        # return status code 200 and success message true
        if signup_instance:
            return jsonify({"status": 200, "success": True})
        else:
            print('Not been able to make the user signup correctly')

        

    except Exception as e:
        # Handle any exceptions that may occur
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})  

if __name__ == '__main__':
    # Run the Flask app on port 3002
    app.run(port=3002, debug=True)
