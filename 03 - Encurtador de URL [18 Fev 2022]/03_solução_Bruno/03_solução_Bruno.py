import bitly_api
from flask import Flask, redirect, render_template, request

BITLY_ACCESS_TOKEN = "d69396736b5325a3adc6a4131b8197dcbc0af5d6"
access = bitly_api.Connection(access_token = BITLY_ACCESS_TOKEN)
app = Flask(__name__)

@app.route("/", methods=["POST", "GET"])
def index():
    return render_template("index.html")

@app.route('/urlShort', methods=['GET', 'POST'])
def urlShort():
    if request.method == 'POST':
        urlText = request.form['textURL']
    else:
        urlText = request.args.get('textURL')

    response = access.shorten(urlText)
    shorturl = response["url"]
    return render_template('link.html', shorturl=shorturl)

    
