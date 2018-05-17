from flask import Flask, jsonify
import platform

app = Flask(__name__)


@app.route("/env")
def env():
    return jsonify({
        "lang": "python",
        "version": platform.python_version()
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
