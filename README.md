# EASY DB (working name)

> Note to future Bob: Don't give up on this. So far it's going really well. There is no need to 'start over' again. Just keep going.

## How to start the dev server

`docker-compose up` to start the server.

## What is it?

MVP DB is a simple, easy to use, database for storing and retrieving data. It is designed to be easy to use for front-end work with very little setup.

MVP DB is built on top or Postgres and uses the Postgres driver for Node.js. The data access is built using TypeScript with TypeORM.

This project aims to serve a similar functionality to Firestore, MongoDB, or DynamoDB, but with a much simpler setup, smaller footprint, and the ease and feel of modifying objects within the JavaScript ecosystem.

## Status

This project is currently in the very early stages of development. It is not ready for use in any production environment.

## Why

I often have product ideas that require a database, but I don't want to spend a lot of time setting up a database. I also don't want to spend a lot of time learning a new database language. I want to be able to use the same language I use for the rest of my project. I want to build a solution that's as intuitive to modify as JSON but with the reliability of Posrgres.

## Will it work?

Honestly? Who knows...

## Plans for hosting

This project should be hosted on Supabase. Supabase is a great service that provides a Postgres database with a simple API. It's a great fit for this project.
