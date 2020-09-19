# AVIF.IO

avif.io is a website for converting a wide variety of file
formats into AVIF, directly inside the browser.
The converted files never get sent to the
server, and the entire conversion process happens
client-side.

## How?

We use [Rust](https://rust-lang.org/) with [wasm-pack](https://github.com/rustwasm/wasm-pack)
to compile a converter library into WASM and call the Rust code
in the browser, from a WebWorker. The program uses Rust's
[image library](https://crates.io/crates/image) to decode files,
and for encoding to AVIF we use a fork of [rav1e](https://github.com/ennmichael/rav1e)
modified to allow for proper progress updates.
The Rust code is in `conversion/`.

## Details

The root of the project is an [express](https://expressjs.com/)
server written in [TypeScript](https://www.typescriptlang.org/).
This server is extremely simple for now, and acts essentially as
a static file server.
You can run the server via `npm start`, and watch and reload the
files via `npm dev`. The `www/` directory contains the front-end
code, which is written in TypeScript and uses [React](https://reactjs.org/).
The front-end code is bundled using [Webpack](https://webpack.js.org/),
and the bundled files end up in `www/dist`. Static files can
be found in `www/static`. 

## Building the Rust code

Building Rust requires `cargo` and `make`. To build the wasm
code for release, use:
```shell script
cd conversion/
make wasm
```
This will also run webpack to move the produced WASM and JS
files to `www/dist`. Keep in mind that when you clone the repository
the Rust code will already have been compiled, so you don't have to
do this step yourself.

Using make, you can use `make wasm-debug` to build the WASM code
for debugging, or use `make demo-debug` to build a demo binary
to test out the Rust code in a non-WASM environment.

## WebP

At the time of writing, the `image` library had very incomplete
support for the WebP format. Instead, we use a special build of
[libwebp](https://github.com/webmproject/libwebp/) called webp_js,
which allows us to decode WebP files in the browser using the
canvas web API. This is important to keep in mind — WebP handling
is a special case at the moment, so don't be surprised that some
of the code is explicitly checking whether it's working with WebP.

## Installing dependencies and building the front-end
First, we will install the back-end and front-end dependencies:
```shell script
npm i
cd www/
npm i
```
Next, we are going to build the front-end:
```shell script
npm run build
```
Package the WASM code:
```shell script
cd conversion/
npx webpack
```
Now, you can run the server locally using `npm run start`,
or you can deploy it to a static web server by copying everything
from `www/dist` and `www/static` and the `www/index.html` file
to the server.

npm i
cd www/
npm i
cd www/
npm run build