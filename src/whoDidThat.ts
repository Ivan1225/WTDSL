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

    public test(input:string) {
        console.log(input);
        if(this.accepts(input)){
            console.log('>> ACCEPTED');
        } else {
            console.log('>> REJECTED');
        }
    }
}

var grammar = new WhoDidThat()
grammar.test('WHO BROKE THE TOY');
grammar.test('who broke the toy');
grammar.test('who did that to you');