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
            publickey=data['doc']['publickey'],
            password=data['doc']['password']
        )
        if login_instance.is_login_successful():
            return jsonify({'status': 200, 'success': True})
        else:
            print('Not been able to login the user')

    except Exception as e:
        # Handle any exceptions that may occur
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})

@app.route('/Signup/InitialSignup', methods=['POST', 'GET'])
def InitialSignup():
    try:
        # get the data from the request
        data = request.get_json()
        print('Received data:', data)
        initial_signup_instance = SignupUser(
            privatekey = data.get('doc').get('privatekey'),
            publickey = data.get('doc').get('publickey')
        )
        initial_signup = initial_signup_instance.signup_initial(
            username=data.get('doc').get('username'),
            gmail=data.get('doc').get('email'),
            dob=data.get('doc').get('dob'),
            contact=data.get('doc').get('contact')
        )
        print(f'initial signup instance: {initial_signup}')
        if initial_signup:
            return jsonify({"status": 200, "success": True})
        else:
            print('some error occured while initial signup of the user')
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})  


# defining the final signup
@app.route('/Signup/FinalSignup', methods=['POST', 'GET'])
def FinalSignup():
    try:
        # get the data from the request
        data = request.get_json()
        print('Received data: ', data)

        final_singup_instance = SignupUser(
            privatekey = data.get('doc').get('privatekey'),
            publickey = data.get('doc').get('publickey')
        )

        final_signup = final_singup_instance.signup_final(
            password = data.get('doc').get('password')
        )
        print(f'final signup status checkup: {final_signup}')
        if final_signup:
            return jsonify({"status": 200, "success": True})
        else:
            print('not been able to complete the final signup')
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})  
    

if __name__ == '__main__':
    # Run the Flask app on port 3002
    app.run(port=3002, debug=True)
