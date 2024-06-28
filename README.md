### Assigment

This project was developed using Vue.js 3, Vite, and Docker.
To run the project in a production environment, run the following commands:

```shell
docker build -t app .
docker run -dp 3000:3000 app
```

To run the project in a development environment, run the following commands:

```shell
yarn
yarn dev
```

In addition, since the total value is not available in the "/data/daily-sales-sku-list/" endpoint, I have statically set
the total value to 5 and have not added styling to the Chart component to avoid extending the loading time. Finally, you
can add slots to the table component as you wish (images, etc., all elements).