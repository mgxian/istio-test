from flask import Flask, jsonify
import platform
import requests

app = Flask(__name__)


@app.route("/env")
def env():
    resp = requests.get('http://' + 'service-go' + '/env')
    data = resp.json()
    return jsonify({
        "message": 'Python' + platform.python_version() + '----->' + data['message']
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
