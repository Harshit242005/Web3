# here i would run the main flask application to accept routes and other stuff


from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

from Auth import LoginUser, SignupUser
from Voting import OwnerCheck, CheckResult, Vote, AlreadyVoted, Get_Result

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
    

# @app.route('/CheckResults', methods=['GET'])    
# def check_results():
#     try:
#         if request.method == 'GET':
#             data = request.get_json()
#             print(f'Received data is: {data}')

#             result_check_instance = CheckResult(
#                 publickey=data.get('doc').get('publickey'),
#                 privatekey=data.get('doc').get('privatekey')
#             )

#             result_status = result_check_instance.show_results()
#             print(f'result check status value is: {result_status}')
#             if result_status:
#                 return jsonify({'status': 200, "results": True})
#             else:
#                 return jsonify({"status": 200, "results": False})
#     except Exception as e:
#         print('some error occuredwhile trying to check uip for owner', e)

# @app.route('/AlreadyVoted', methods=['GET'])
# def already_voted():
#     try:
#         if request.method == 'GET':
#             publickey = request.args.get('publickey')
#             print(f'public key we have received for the voting status check is: {publickey}')
#             voted_status = AlreadyVoted(publickey).alreadyVoted()
#             if voted_status:
#                 return jsonify({'status': 200, 'already_voted': True})
#             else:
#                 print(f'user with this public key: {publickey} has not been voted yet')
#     except Exception as e:
#         print(f'Error while getting checked if the user has voted or not')

@app.route('/Vote', methods=['POST', 'GET'])
def Vote():
    try:
        data = request.get_json()
        print(f'Received data is: {data}')

        vote_instance = Vote(
            publickey=data.get('doc').get('publickey'),
            privatekey=data.get('doc').get('privatekey'),
            username = data.get('doc').get('username'),
            email = data.get('doc').get('email'),
            dob = data.get('doc').get('dob'),
            contact = data.get('doc').get('contact'),
            partyName = data.get('doc').get('partyName')
        ).vote_party()
        if vote_instance:
            return jsonify({'status': 200, 'success': True})
        else:
            print('not been able to vote right now')

    except Exception as e:
        print('some error occuredwhile trying to check uip for owner', e)

# for getting the results 
@app.route('/GetResult', methods=['POST', 'GET'])
def GetResults():
    try:
        if request.method == 'GET':
            result = Get_Result().get_results()
            print(f'result of the election is: {result}')
            return jsonify({'status': 200, "result_data": result})
    except Exception as e:
        print(f'Not been able to get the results: {e}')

if __name__ == '__main__':
    # Run the Flask app on port 3002
    app.run(port=3002, debug=True)
