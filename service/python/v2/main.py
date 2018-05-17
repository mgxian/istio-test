from apistar import App, Route
import platform


def env():
    return {
        "lang": "python",
        "version": platform.python_version()
    }


routes = [
    Route('/env', method='GET', handler=env),
]

app = App(routes=routes)


if __name__ == '__main__':
    app.serve('0.0.0.0', 80)
