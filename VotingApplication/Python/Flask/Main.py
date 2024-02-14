# here i would run the main flask application to accept routes and other stuff

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
CORS(app)
# Define an endpoint to receive data from Vue.js
@app.route('/Login', methods=['POST'])
def Login():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Process the data as needed
        # In this example, we'll print it to the console
        print('Received Data:', data)

        # You can perform further processing or store the data in a database

        # Return a success response
        return jsonify({'success': True, 'message': 'Data received successfully'})

    except Exception as e:
        # Handle any exceptions that may occur
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})
    

@app.route('/Signup', methods=['POST'])
def Signup():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        

        # Process the data as needed
        # In this example, we'll print it to the console
        print('Received Data:', data)

        # You can perform further processing or store the data in a database

        # Return a success response
        return jsonify({'success': True, 'message': 'Data received successfully'})

    except Exception as e:
        # Handle any exceptions that may occur
        print('Error:', str(e))
        return jsonify({'success': False, 'message': 'Error processing data'})  

if __name__ == '__main__':
    # Run the Flask app on port 3002
    app.run(port=3002, debug=True)
