#!/usr/bin/python

import hashlib
from base64 import encodestring as encode
from base64 import decodestring as decode

import sys

def makeSecret(password):
    salt = os.urandom(4)
    h = hashlib.sha1(password)
    h.update(salt)
    return "{SSHA}" + encode(h.digest() + salt).strip()

def checkPassword(challenge_password, password):
    challenge_bytes = decode(challenge_password[6:])
    digest = challenge_bytes[:20]
    salt = challenge_bytes[20:]
    print len(salt)
    hr = hashlib.sha1(password)
    hr.update(salt)
    return digest == hr.digest()

if __name__ == "__main__":
	print checkPassword(sys.argv[1], sys.argv[2])
