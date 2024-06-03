from functions import *

app = Flask(__name__)
CORS(app)

@app.route('/s3upload', methods=['POST'])
def s3upload():
    if 'files' not in request.files:
        return jsonify({'error': 'No files part'}), 400
    
    files = request.files.getlist('files')
    username = request.form['username']

    if len(files) == 0:
        return jsonify({'error': 'No selected files'}), 400
    
    uploaded_files_urls = []
    for file in files:
        if file.filename == '':
            continue
        
        filename = secure_filename(file.filename)
        s3_path = f"{username}/{filename}"
        try:
            s3.upload_fileobj(
                file,
                S3_BUCKET,
                s3_path
            )
            file_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{username}/{filename}"
            uploaded_files_urls.append(file_url)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    if len(uploaded_files_urls) == 0:
        return jsonify({'error': 'No files were uploaded'}), 400
    
    return jsonify({'file_urls': uploaded_files_urls}), 200

@app.route('/s3delete', methods=['DELETE'])
def s3delete():
    if 'username' not in request.form or 'filename' not in request.form:
        return jsonify({'error': 'Username and filename required'}), 400

    username = request.form['username']
    filename = secure_filename(request.form['filename'])
    s3_path = f"{username}/{filename}"
    try:
        s3.delete_object(Bucket=S3_BUCKET, Key=s3_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'message': 'File deleted successfully'}), 200

@app.route('/s3list', methods=['POST'])
def s3list():
    if 'username' not in request.form:
        return jsonify({'error': 'Username required'}), 400

    username = request.form['username']
    s3_prefix = f"{username}/"
    
    try:
        response = s3.list_objects_v2(Bucket=S3_BUCKET, Prefix=s3_prefix)
        if 'Contents' not in response:
            return jsonify({'file_names': []}), 200

        file_names = [obj['Key'].replace(s3_prefix, '') for obj in response['Contents']]
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'file_names': file_names}), 200

@app.route('/s3download', methods=['POST'])
def s3download():
    if 'username' not in request.form or 'filename' not in request.form:
        return jsonify({'error': 'Username and filename required'}), 400

    username = request.form['username']
    filename = secure_filename(request.form['filename'])
    s3_path = f"{username}/{filename}"
    
    try:
        s3_object = s3.get_object(Bucket=S3_BUCKET, Key=s3_path)
        file_stream = io.BytesIO(s3_object['Body'].read())
        file_stream.seek(0)
        return send_file(file_stream, download_name=filename, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET']) 
def helloworld(): 
    if request.method == 'GET': 
        data = {"response": APP_NAME+" Backend Running!"}
        console.log(data, log_locals=True) 
        return jsonify(data), 200
    
if __name__ == '__main__': 
	app.run(debug=True)