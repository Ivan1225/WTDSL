# WTDSL
This is Web Testing Dsl, which for people with limit knowledge of programming. We want a DSL that *NATURAL*, *SIMPLE*, *USEFUL*.

* Natural: The code is read as natural human language
* Simple: The syntax of code is easy to use and understand
* Useful: Doing repeated test job for you, also provide visualization of test step.

# Setup

Make sure that you have:

* node
* yarn
* mocha

# EBNFs

```

EBNF:	
PROGRAM ::== VISIT STATEMENT*

STATEMENT ::== [VISIT | SELECT | EVENT | ASSERTION | WITHIN | VALDEF | LOOP]

VISIT ::== 'Visit' url (a valid url)

SELECT ::== 'Select' SELECTOR
SELECTOR ::== '{'selector'}' (selector mean a valid css selector)

EVENT ::== [CLICK | WAIT | FILL]
CLICK ::== 'Click'
WAIT ::== 'Wait' NUMBERVAL
FILL ::== 'Fill' VALUE

ASSERTION ::== 'Expect' ATTRIBUTE [BE | NOTBE | CONTAIN | NOTCONTAIN] VALUE
BE ::== 'should be' 
NOTBE ::== 'should not be' 
CONTAIN ::== 'should contain' 
NOTCONTAIN ::== 'should not contain' 

WITHIN ::== 'Within' SELECTOR STATEMENT* 'EndWithin'

VALDEF ::== 'Value of' VARIABLENAME 'is' VALUE
VARIABLENAME ::== string
VALUE ::== [STRINGVAL | NUMBERVAL | ATTRIBUTE | VARIABLENAME]

LOOP ::== 'For each in' '('SELECTOR (',' SELECTOR)*')' STATEMENT* 'EndFor'

ATTRIBUTE ::== '[' string ']'
STRINGVAL ::== '"'string'"'
NUMBERVAL ::== number

```

# Usage

## Scripte

We provide a simple scrpite that can be used to run our DSL.
But since current limit of impletation, the target code file must be sorted under `./resources` folder. And the latest output result would be stored in `./resources/output.txt`.

### comand

```
./WTDSL.sh [target file Name path under ./resources]
```

## Example

Sample code:
```
Visit https://www.ubc.ca
Wait 5
Select {#menu-about}
Value of test is "About UBC"
Expect [text] should be "About UBC"
Click
Wait 5
Select {button[data-target="#ubc7-global-menu"]}
Click
Wait 5
Within {.expand.in.collapse}
Select {input.input-xlarge.search-query}
Fill "cpsc"
Select {button}
Click
EndWithin
Wait 5
```

Expalin of code:

It will open the www.ubc.ca link first. Wait for 5 seconds for the page loading. It will select element with css “#menu-about” and compare if its text value should be “About UBC”. And then, it will click the element. It will wait 5 second for the page loading. Then choose element "button[data-target="#ubc7-global-menu"]" and click it again. Wait 5 second for load, Then, it restricts the test area to be inside of the element with css “.expand.in.collapse”. Then it find the input field of search bar, and fill in “cpsc”. Then, it clicks the submit button. It will wait for another 5 seconds for the page loading.

Comand:
```
./WTDSL.sh valid/example.txt
```

Sample output:
```
Building the DSL
yarn run v1.16.0
$ tsc
✨  Done in 3.81s.
Starting WTDSL
loading this page:  https://www.ubc.ca
loaded this page:  https://www.ubc.ca
For element  #menu-about, compare actual value: About UBC equal to expect value: About UBC
passed test
For element  #menu-about, compare actual value: About UBC equal to expect value: About UBC
passed test
For element  #menu-about, compare actual value: About UBC equal to expect value: About UBC
passed test
Tring click on  #menu-about.
Clicked on  #menu-about.
Tring click on  button[data-target="#ubc7-global-menu"].
Clicked on  button[data-target="#ubc7-global-menu"].
For element  button[data-target="#ubc7-global-menu"], compare actual value: collapse cotain expect value: cllapse
failed test
starting wait 5 seconds
waited 5 seconds
Ran 4 test(s) in total; 3 test(s) passed; 1 test(s) failed
Failed tests are: test 4
```