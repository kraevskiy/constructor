export interface ResponseMail {
	"accepted": string[];
	"rejected": unknown[];
	"envelopeTime": number;
	"messageTime": number;
	"messageSize": number;
	"response": string;
	"envelope": {
		"from": string;
		"to": string[];
	};
	"messageId": string;
}
