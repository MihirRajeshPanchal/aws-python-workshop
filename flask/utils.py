from flask import Flask, jsonify, request , send_file, make_response, Response
from flask_cors import CORS
from dotenv import load_dotenv
from rich.console import Console
import os
import boto3
import botocore
from werkzeug.utils import secure_filename
import mimetypes
import io