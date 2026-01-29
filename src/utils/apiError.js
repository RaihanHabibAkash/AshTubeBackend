class ApiError extends Error{
    constructor(
        statusCode,
        message = "Error in ApiError",
        errors = [],
        stack = "",
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if(stack !== ""){
            this.stack = stack;
        } else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };


/*
----Stack Tracer-----
message = crime description.
statusCode = crime severity.
stack trace = CCTV footage of how crime happened.


--------Short Summary------
1. stack = where error came from.

2. If stack is already provided → keep it
< this.stack = stack >

3. If not → create a clean stack trace.
< Error.captureStackTrace(this, this.constructor) > 
4. CaptureStackTrace hides unnecessary noise by
Attach a stack trace to this error object, 
and hide the constructor itself from the trace.

5. This is for developers only, not users
*/







/*
-----Error.captureStackTrace(targetObject, constructorOpt)-------
targetObject → where the stack is stored,
constructorOpt → functions above this are removed from stack.

----means-----
Create a stack trace for this error, 
but start it AFTER the ApiError constructor.

----Simple logic------
1. Think of stack trace like a call history.
2. WITHOUT this.constructor
→ includes “I opened the phone app”
3. WITH this.constructor
→ starts from “I called Mom”
4. The phone app itself is not useful information.
*/