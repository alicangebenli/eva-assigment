type ApiResponse<Result> = {
    "ApiStatus": boolean,
    "ApiStatusCode": string,
    "ApiStatusMessage": string,
    "Data": Result,
}

