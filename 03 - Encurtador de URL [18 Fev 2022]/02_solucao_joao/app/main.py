from flask import Flask, render_template, redirect, request
import random
import json
import os

app = Flask(__name__)
with open(os.path.join(app.static_folder, 'json/database.json'),'r') as file:
    database = json.load(file)

def reroute(url):
    global database
    if url=="https://":
        return -1
    else:
        opt = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        val = ""
        while True:
            end = 0
            for i in range(5):
                val+=random.choice(opt)
            for i in range(len(database)):
                site = database[str(i)]
                end = 1
                if url == site["url"]:
                    new_route = request.base_url+site["route"]
                    return new_route
                if site["route"]==val:
                    end = 0
            if end==1:
                length = len(database)
                database[str(length)]={}
                site = database[str(length)]
                site["url"]=url
                site["route"]=val
                new_route = request.base_url+val
                with open(os.path.join(app.static_folder, 'json/database.json'),'w') as file:
                    json_object = json.dumps(database, indent = 4)
                    file.write(json_object)
                return new_route



@app.route('/<route>')
def router(route):
    val = ""
    for i in range(len(database)):
        site=database[str(i)]
        if site["route"]==route:
            val = site["url"]
    return redirect(val)

@app.route('/')
def index():
    return render_template('index.html', style="display:none",lock="", value="", pointer="pointer")

@app.route('/', methods=['POST'])
def my_form_post():
    text = request.form['text']
    text=text.replace("http://","")
    text=text.replace("https://","")
    text="https://"+text
    processed_text = reroute(text)
    if processed_text==-1:
        return render_template('index.html', style="display:none",lock="", value="", pointer="pointer")
    else:
        return render_template('index.html', style="",lock="disabled", value=processed_text, pointer="auto")
