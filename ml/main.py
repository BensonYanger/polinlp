import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


# @app.route('/', methods=['GET'])
# def home():
#     return "<h1>Test</h1><p>url.</p>"


@app.route('/api', methods=['GET'])
def api():
    url = request.args.get('stuff')

    return url

app.run()