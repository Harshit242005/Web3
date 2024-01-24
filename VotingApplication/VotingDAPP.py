

# register contract python file callups
from VotingCode.Registration.RegisterUser import Register
from VotingCode.Registration.LoginPassword import LoginUserPassword
from VotingCode.Registration.SetPassword import SetPassword
from VotingCode.Registration.RegistrationContractData.RegisterContractAddress import register_contract_address
from VotingCode.Registration.RegistrationContractData.RegisterContractABI import register_contract_abi


# voting contract python file callups
from VotingCode.Voting.ShowResult import ShowResultVariable, AnnounceResult
from VotingCode.Voting.VoteParty import voteParty
from VotingCode.Voting.VotingResults import ShowResult
from VotingCode.Voting.CheckVoting import checkVoting


# flask application creation
from flask import Flask, redirect, render_template, request, url_for
app = Flask(__name__)


# making web3 connections and setup
from web3 import Web3
# Connect to the Ethereum node
goerli_rpc_url = "https://sepolia.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))

# Convert the address to checksum format
register_checksum_address = web3.to_checksum_address(register_contract_address)
register_contract = web3.eth.contract(address=register_checksum_address, abi=register_contract_abi)


# we have to create some kind of file which can save this value eg. Enviroment variable file 
global account
account = None

global privatekey
privatekey = None

global has_result
has_result = False

global user_data 
user_data = None

@app.route('/')
def index():
    return render_template('Address.html')

@app.route('/process_address', methods=['POST'])
def process_address():
    
    if request.method == "POST":
        # Access the form data using request.form
        global account
        account = request.form.get('web3_address')
        print(f'Address we have got from Address.html is: {account}')
        global owner
        owner = False
        if account == "0x5780326e9F221afd01253C954b453ccCf4f2F30E":
            owner = True
            print('Election committee')
        else:
            owner = False
            print('Normal User')
    return render_template("Landing.html")

@app.route('/results', methods=['GET', 'POST'])
def results():
    result_string = None
    if request.method == 'POST':
        
        
        result_string = ShowResult()
        print(f'Result: {result_string}')
    return render_template('Results.html', result_string=result_string)
   

@app.route('/announce', methods=['GET', 'POST'])
def accounce():
    if request.method == 'POST':
        global privatekey
        privatekey = request.form.get('privateKey')
        print(f'the accounnt is; {account} and the private key is: {privatekey}')
        transaction_receipt_for_result_declaration = ShowResult.AnnounceResult(account, privatekey)
        print(transaction_receipt_for_result_declaration)
        if transaction_receipt_for_result_declaration:
            return render_template('announced.html')
        else:
            print("Result has not been announced successfully!!!")    


@app.route('/owner_access',  methods=['GET', 'POST'])
def owner_access():
    global has_result
    has_result = False
    if request.method == 'GET':
        has_result = ShowResult.ShowResultVariable(account) 
        print(f'Inital value of the announce result is: {has_result}') 
    return render_template('owner.html', has_result=has_result)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        password = request.form.get('password')
        checkStatusLogin = LoginUserPassword(account, privatekey, password)
        if checkStatusLogin == False:
            return redirect(url_for('loginfailed'))
        else:
            return redirect(url_for('VotingInterface', user_data=checkStatusLogin))
    return render_template("Login.html")

@app.route('/vote', methods=['GET', 'POST'])
def vote():
    
    if request.method == 'POST':
        user_data = request.form.get('user_data')
        partyname = request.form.get('partyname')
        # Perform any necessary actions with user_data and partyname
        name = user_data["name"]
        email = user_data["email"]
        phoneNumber = user_data["phoneNumber"]
        age = user_data["age"]
        gender = user_data["gender"]
        location = user_data["location"]
        print(f'the vote is for: {partyname} from the account: {account}, these are the details: {name}, {email}, {phoneNumber}, {age}, {gender}, {location}')
        VoteParty.uploadValuesForVote(privatekey, account, name, email, phoneNumber, age, gender, location, partyname)
        VoteParty.Vote()
        return render_template('Vote.html', user_data=user_data, partyname=partyname)
    return render_template('NoVote.html', user_data=user_data, partyname=partyname)


@app.route('/VotingInterface',  methods=['GET', 'POST'])
def votinginterface():
    global user_data 
    user_data = None
    if request.method == "GET":
        user_data = request.args.get('user_data')
        #privatekey = request.args.get('privatekey')
        print(user_data)
    has_vote = checkVoting(account)    
    return render_template('VotingInterface.html', user_data=user_data, has_vote=has_vote, account=account, privatekey=privatekey, has_result=has_result)

@app.route('/signup')
def signup():
    # Pass the owner value to the Signup.html template
    print(f'Print value for signup {owner}')
    return render_template("Signup.html")

@app.route('/loginfailed')
def loginfailed():
    return render_template('loginFailed.html')


@app.route('/setpassword', methods=['GET', 'POST'])
def setpassword():
    if request.method == 'GET':
        # Render the setpassword.html template with the parameters
        return render_template('setpassword.html', account=account, privatekey=privatekey)
    elif request.method == 'POST':
        # Getting the password from the form
        password = request.form.get('password')
        set_password_reciept = SetPassword.setPassword(account, password, privatekey)
        is_set_password = False
        for event in register_contract.events.RegistrationStatusFinalStatus().process_receipt(set_password_reciept):
            is_set_password = event['args']['isRegistered']
        if is_set_password:
            return redirect(url_for('login'))
    # Handle other cases, e.g., if the request method is neither GET nor POST
    return render_template('error.html', message='Invalid request method')


# handle the user signup
@app.route('/process_signup', methods=['POST'])
def process_signup():
    if request.method == 'POST':
        global account
        global privatekey
        privatekey = request.form.get('private_key')
        #privatekey = request.form.get('privatekey')
        name = request.form.get('name')
        email = request.form.get('email')
        contact = request.form.get('contact')
        age = request.form.get('age')
        gender = request.form.get('Gender')
        location = request.form.get('location')
        print(f'Recieved data is: {privatekey}, {name}, {email}, {contact}, {age}, {gender}, {location}')
        print(f'Private key we recieved from the form is: {privatekey}')
        print(f'account address for the process_signup route: {account}')
        # with this function user might be registerd
        receipt_register = Register(account, privatekey, name, email, contact, age, gender, location)
        # is_user_registered = ''
        global is_initial_status_true
        is_initial_status_true = False

        # checking user inital status check if that worked out for him
        for event in register_contract.events.RegistrationStatusInitalStatus().process_receipt(receipt_register):
            is_initial_status_true = event['args']['isRegistered']

        # Redirect to /setpassword if events are True
        if is_initial_status_true:
            return redirect(url_for('setpassword'))
        # If the conditions are not met, you can render a different template or provide an error message
        return render_template('signup_error.html', message='Registration failed or events conditions not met')
    

if __name__ == '__main__':
    app.run(debug=True)
