from happytransformer import HappyTextClassification
from http.server import BaseHTTPRequestHandler, HTTPServer  # imported to have an http endpoint
import json
from typing import Union
# the code for the transformer is adapted from this tutorial: https://www.youtube.com/watch?v=jti2sPQYzeQ

happy_tc = HappyTextClassification("BERT", "Hate-speech-CNERG/dehatebert-mono-english", 2)

class handler(BaseHTTPRequestHandler):
    def send_response_with_body(self, status_code: int, body: Union[str, dict]) -> None:
            """
            Send an HTTP response with the given status code and body. Supports plaintext string or dict to be serialized as json.
            """

            self.send_response(status_code)
            if type(body) == str:
                self.send_header("Content-type", "text/plain")
                self.end_headers()
                self.wfile.write(body.encode())
            else:
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dump(body))
    def do_GET(self):
        data = "hello, world!"
        self.send_response_with_body(
            status_code=200,
            body = data
        )
    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'))
        req_body: list[dict] = json.loads(self.rfile.read(content_len))

        res_indices_list = []

        for post in req_body:
            sentences: list[str] = post["sentences"]

            bad_indices = []

            for i, sentence in enumerate(sentences):
                if happy_tc.classify_text(sentence).label == "HATE":
                    bad_indices.append(i)
            
            res_indices_list.append(bad_indices)
        self.send_response_with_body(
            status_code=200,
            body = json.dumps(res_indices_list)
        )


HTTPServer(("",80),handler).handle_request()
