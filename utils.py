from flask import jsonify, Response
from random import choice
from string import ascii_letters, digits


def parse_id(x):
    try:
        x = int(x)
        if x <= 0:
            return None
    except ValueError:
        return None

    return x


def int_or_else_get(x, other):
    try:
        x = int(x)
        return x
    except ValueError:
        return other


def response_message(message, status):
    message = jsonify(message)
    return Response(message.get_data(as_text=True), status=status, mimetype='application/json')


def get_random_string(length):
    pool = ascii_letters + digits
    return ''.join(choice(pool) for i in range(length))


def contains_correct_answer(answers):
    return any(filter(lambda a: a['correct'], answers))
