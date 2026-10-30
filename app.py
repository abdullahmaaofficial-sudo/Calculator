<<<<<<< HEAD
from flask import Flask,render_template,redirect,request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/calculate',methods =['POST'])
def calculate():
    data = request.json
    return {'value': eval(data.get('val').strip())} ,200

if __name__ == '__main__':
    app.run(debug=True ,port=5000)
=======
from flask import Flask,render_template,redirect,request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/calculate',methods =['POST'])
def calculate():
    data = request.json
    return {'value': eval(data.get('val'))} ,200

if __name__ == '__main__':
    app.run()
>>>>>>> ccec5af53ea52192da2951b0dba365c58e184710
