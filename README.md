# typescript-file-merger
This is another boilerplate project explaining some basic javascript/typescript stuff

# Setup

Make sure that you have:

* node
* yarn
* mocha

# EBNFs

For this tutorial, we want to parse an [EBNF grammar](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).  

For those that do not know what an EBNF grammar is, it looks just like this:

```
WHO_DID_THAT ::= 'WHO' VERB 'THE' SUBJECT

VERB ::= some string that is a verb in an english grammar

SUBJECT ::= some string that is a noun in an english grammar
```

In such case, a grammar is basically a set of productions that describe all possible strings in some domain. Holly Molly! that is too theoretical!

Well, let us walk through an example and everything will be way more clear. 

## Who did that grammar

If we imagine that the english grammar may be a... grammar, its constructs are usually nouns, verbs, adjectives, and so forth. One can imagine some simple productions for a grammar that describes that someone did something to something else. We call that grammar the `WHO_DID_THAT` grammar. It expects a `WHO` string followed by a `VERB`, which in turn is followed by the string `THE` and finally has a `SUBJECT`. Here are some examples of productions that are satisfied by this grammar:

* WHO BROKE THE TOY
* WHO STOLE THE CAR
* WHO WASHED THE DISHES

If we break down the productions step by step the phrase `WHO WASHED THE DISHES` was generated like this:

```
WHO_DID_THAT ::= 'WHO' VERB 'THE' SUBJECT

VERB ::= 'WASHED'

SUBJECT ::= DISHES
```

So, a grammar describes how we can generate something that is accepted in a certain domain. 

Clearly, the `WHO_DID_THAT` grammar does not accept the string `TYPESCRIPT is awesome`. When I pass this string to the `WHO_DID_THAT` grammar, it tries to match `TYPESCRIPT` against its first expected value `WHO` and then would return false. The same would apply for the string `WHO LOVES ICECREAM?`. Despite the `WHO` and the verb that matches production rules from our grammar, after the verb our example would expect a `THE` but found `ICECREAM` instead. Therefore, this input would also be invalid.


### Writing a program that accepts or rejects the WHO_DID_THAT grammar


First, let us consider the `whoDidThat.ts` script:

```typescript
export class WhoDidThat {
    
    public accepts(input:string): boolean {
        var data = input.split(' ');

        for (var pointer:number = 0; pointer < data.length; pointer++) {
            if (!this.isValid(pointer, data[pointer])) {
                return false;
            }
        }

        return true;
    }

    public isValid(pointer:number, input:string): boolean {
        switch (pointer){
            case 0:
                return input === 'WHO';
            case 1:
                return typeof input === 'string';
            case 2:
                return input === 'THE';
            case 3:
                return typeof input === 'string';
            default:
                break;
        }
        return false;
    }
}
```

In the `accepts` function, we split the input string and create a pointer that walks through the input string. At each index, it checks if the content of that index is valid, e.g. index `0` expects the `WHO` string. That's quiet simple! Let us test our grammar:

```typescript
var grammar = new WhoDidThat()
grammar.test('WHO BROKE THE TOY');
grammar.test('who broke the toy');
grammar.test('who did that to you');
```

Running `yarn who` to test our grammar with the above input would yield something like:

```
WHO BROKE THE TOY
>> ACCEPTED
who broke the toy
>> REJECTED
who did that to you
>> REJECTED
```

Awesome! Now, let's dive into some nasty recursion!

# A simple email grammar

Now that we have the basics. Lets see a more complicated case. A simple email grammar in which an email is a `json`!

Almost everyone is familiar with the overall way that you write an email. Usually, there is a **from**, **to** and **subject** field as well as a **body** message. But our `EMAIL` grammar is even simpler: it only accepts a **to** and a message **body**:

```
EMAIL ::= '{' HEADER ', ' BODY '}'

HEADER ::= '"TO":{ "recipient":' EMAIL [CC] '}'

BODY ::= '"BODY": '{' "message":' TEXT '}'

CC ::=  ', "cc":'  EMAIL | 
        ', "cc": [' (EMAIL ', ')* EMAIL ']'

TEXT ::= '"' string '"'

EMAIL ::= '"' TEXT '@' TEXT ('.' TEXT)* '"'
```

Some examples of accepted strings for this grammar would be:

```json
{ "TO": {"recipient" : "hello@world.com"}, "SUBJECT": {"message": "Take these GoT spoilers"} }
```

OR

```json
{
  "TO": { "recipient" : "hello@world.com", "cc": "foo@bar.edu" },
  "SUBJECT": { "message": "the Answer to the Ultimate Question of Life, the Universe, and Everything" }
}
```

OR

```json
{
  "TO": { "recipient" : "hello@world.com", "cc": [ "foo@bar.edu", "hitchhiker@galaxy.universe" ] },
  "SUBJECT": { "message": "Don't panic!" }
}
```

There are a lot of new tricky constructions and I'm going to quickly detail them:

* `[ field ]` - means that the constructions in brackets are optional. In other words or email grammar accepts a header  with only one recipient or one with the recipient and the cc field because of the `[CC]` rule.
* `fieldA | fieldB` - means that the rule can be satisfied if either fieldA **or** fieldB appears. As an example, or `[CC]` rule accepts either a single email *or* and array of emails
* `(field)*` - means that you can have zero or more occurrences of that construction. In our email grammar, the array expects at least one email but it can have zero or more emails separated by a comma because of the `(EMAIL ', ')*` construction. 


### Writing a program that accepts or rejects the EMAIL grammar

Considering that our email grammar receives a json as an input, there is something that is not specified explicitly in the grammar but we haev to handle. The field order is not strict. Thus both this examples should be accepted:

```json
{ "TO": {"recipient" : "hello@world.com"}, "SUBJECT": {"message": "Take these GoT spoilers"} }
```

```json
{ "SUBJECT": {"message": "Take these GoT spoilers"}, "TO": {"recipient" : "hello@world.com"} }
```

Moreover, splitting the string and using a pointer to walk through it is really complicate if your grammar is complex enough. 

So let us use some **object orientation principles** in order to improve our email grammar. Take a look at the `email.ts` script. 
At its core, the validation is quite simple, everything is done in the `EmailParser` class.

```typescript
export class EmailParser {

    public accepts(input: string): boolean {
        let email = new Email(input);
        return email.isValid();
    }
}
```

In order to accept an input, we instantiate an email and then we check whether the email is valid or not.

The `Email` class is also quite simple. Instead of doing everything on a single class, an email has two fields, i.e. a `header` and a `subject` and its constructor converts the string input into a json and then checks whether these fields exist in the json. If the fields exist, they are instantiated.

```typescript
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
        let bodyIsValid = this.body != null  && this.body.isValid();
        return headerIsValid && bodyIsValid;
    }
}
```

Once again, the responsability to encapsulate the validation of the header and the body are delegated to yet another two classes the `Header` and the `Body`, respectively.
If we continue this process of divide and conquer, we will encapsulate the grammar validation is small units (classes) that will reflect our email grammar such that it is highly modifiable/maintainable.
As an example, take a look into the `Body` class:

```typescript
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
```
The class instantiates the `message` field if it exists in the `jsonData` variable passed to its constructor. The isValid methor is quite simple as well, it checks whether the field was properly instantiated and that its data type is a string.

In order to completely understand the classes, I encourage you to take some time evaluating the `email.ts` file and trying to add new constructions to the grammar: `BCC` and `ATTACHMENT`.

```
EMAIL ::= '{' HEADER ', ' BODY '}'

HEADER ::= '"TO": '{' "recipient":' EMAIL [CC] [BCC] '}'

BODY ::= '"BODY": '{' "message":' TEXT [ATTACHMENT] '}'

CC ::=  ', "cc":'  EMAIL | 
        ', "cc": [' (EMAIL ', ')* EMAIL ']'
        
BCC ::= ', "bcc":'  EMAIL | 
        ', "bcc": [' (EMAIL ', ')* EMAIL ']'
        
ATTACHMENT ::=  ', "attachment":'  FILE_PATH | 
                ', "attachment": [' (FILE_PATH ', ')* FILE_PATH ']'

TEXT ::= '"' string '"'

EMAIL ::= '"' TEXT '@' TEXT ('.' TEXT)* '"'

FILE_PATH ::= (TEXT /)* TEXT '.' TEXT
```
# Scripts

* `yarn who` provides examples of inputs accepted/rejected by the `WHO_DID_THAT` grammar
* `yarn email` provides examples of inputs accepted/rejected by the `EMAIL` grammar