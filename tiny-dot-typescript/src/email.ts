interface IHeader {
    to: string,
    cc?: string | string[];

    isValid(): boolean;
}

interface IBody {
    message: string;

    isValid(): boolean;
}

class Header {

    to: string;
    cc: string | string[];

    constructor(jsonData: any) {
        if (Object.keys(jsonData).indexOf('recipient') !== -1) {
            this.to = jsonData['recipient'];
        }
        if (Object.keys(jsonData).indexOf('cc') !== -1) {
            this.cc = jsonData['cc'];
        }
    }

    isValid(): boolean {
        let toIsValid = this.to != null && typeof this.to === "string" && this.isValidEmailField(this.to);

        let ccIsEmpty = this.cc == null;
        let ccIsValid = (this.cc != null && this.isValidEmailField(this.cc) && ((Array.isArray(this.cc) || (typeof this.cc === "string"))));
        return toIsValid && (ccIsEmpty || ccIsValid);
    }

    isValidEmailField(input: string | string[]): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (Array.isArray(input)) {
            let emails = input.filter((input: string): boolean => {
                return re.test(input);
            });

            return emails.length === input.length;
        } else {
            return re.test(input);
        }
    }
}

class Body {

    message: string;

    constructor(jsonData: any) {
        if (Object.keys(jsonData).indexOf('message') !== -1) {
            this.message = jsonData['message'];
        }
    }

    isValid(): boolean {
        return this.message != null && typeof this.message === "string";
    }

}

class Email {

    header: IHeader;
    body: IBody;

    constructor(data: any) {
        let jsonData = JSON.parse(data);


        if (Object.keys(jsonData).indexOf('TO') !== -1) {
            this.header = new Header(jsonData['TO']);
        }

        if (Object.keys(jsonData).indexOf('SUBJECT') !== -1) {
            this.body = new Body(jsonData['SUBJECT']);
        }
    }

    public isValid() {
        let headerIsValid = this.header != null && this.header.isValid();
        let bodyIsValid =this.body != null  && this.body.isValid();
        return headerIsValid && bodyIsValid;
    }
}


export class EmailParser {

    public accepts(input: string): boolean {
        let email = new Email(input);
        return email.isValid();
    }


    public test(input: string) {
        console.log(input);
        if (this.accepts(input)) {
            console.log('>> ACCEPTED');
        } else {
            console.log('>> REJECTED');
        }
        console.log();
    }
}
//
// var grammar = new EmailParser();
// grammar.test('{ "TO": {"recipient" : "hello@world.com"}, "SUBJECT": {"message": "Take these GoT spoilers"} }');
// grammar.test('{ "TO": {"recipient" : "hello@world.com"}, "SUBJECT": 1 }');
// grammar.test('{ "TO": {"recipient" : "hello@world.com"}, "SUBJECT": {"message": 1} }');
// grammar.test('{ "TO": 1, "SUBJECT": {"message": "Take these GoT spoilers"} }');
// grammar.test('{ "TO": {"recipient" : 1}, "SUBJECT": {"message": "Take these GoT spoilers"} }');
// grammar.test('{ "TO": {"recipient" : "1"}, "SUBJECT": {"message": "Take these GoT spoilers"} }');
// grammar.test(' { "SUBJECT": {"message": "Take these GoT spoilers"}, "TO": {"recipient" : "hello@world.com"} }');
// grammar.test('{ "TO": { "recipient" : "hello@world.com", "cc": "foo@bar.edu" }, "SUBJECT": { "message": "the Answer to the Ultimate Question of Life, the Universe, and Everything" }}');
// grammar.test('{"TO": { "recipient" : "hello@world.com", "cc": [ "foo@bar.edu", "hitchhiker@galaxy.universe" ] }, "SUBJECT": { "message": "Don\'t panic!" } }');
// grammar.test('{"TO": { "recipient" : "hello@world.com", "cc": 1 }, "SUBJECT": { "message": "Don\'t panic!" } }');
// grammar.test('{"TO": { "recipient" : "hello@world.com", "cc": [ 1, "hitchhiker@galaxy.universe" ] }, "SUBJECT": { "message": "Don\'t panic!" } }');
// grammar.test('{"TO": { "recipient" : "hello@world.com", "cc": [ "foo@bar.edu", 1 ] }, "SUBJECT": { "message": "Don\'t panic!" } }');
// grammar.test('{"TO": { "recipient" : "hello@world.com", "cc": [ 1, 2 ] }, "SUBJECT": { "message": "Don\'t panic!" } }');
//
//
//
//
//


