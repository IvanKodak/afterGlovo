# afterGlovo

# If you want to start application:

    1. Git clone
    3. cp .env.example .env
    4. Add your glovo ApiKey and SecretKey to .env. And add your openCage ApiKey to .env.
    5. sudo docker build -t <your-name>/after-glovo .
    6. sudo docker run --env-file ./.env -p 4040:4040 -d <your-name>/after-glovo

# Routes

URl              ->  /order
Method           ->  POST
Request Example  -> {
                        "fromAddress": "проспект Соборний, 186А, Запоріжжя, Запорізька область, 69035",
                        "toAddress": "проспект Соборний, 83/85, Запоріжжя, Запорізька область, 69000",
                        "desc": "Something"
                    }
Response Example -> {
                        "orderEstimate": {
                            "total": 
                                    {
                                        "amount": 6900,
                                        "currency": "UAH"
                                    }   
                            },
                        "orderEstimateWithDiscount": {
                            "total": 
                                    {
                                        "currency": "UAH",
                                        "total": 5520
                                    }
                            }
                    } 