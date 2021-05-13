# Thief's Gambit

`(WIP - Just started - Not much to see yet)`

## Description

A pirate themed slots game.

One big part that I haven't implemented yet is the "Cheat" mechanic (as any pirate would do).

## Technical

- Server
  - The API is written in Golang, uses the Fiber framework (which is super similar to express), and GORM (Go ORM for working with relational databases).
  - The Database is Postgres running within a docker container, on a amazon linux server
  - The API creates and hands out JWT's to authenticated users. The JWT is stored in an HTTPOnly cookie (so it cannot be accessed by any javascript).
- Client
  - The client application is React (create-react-app)
  - Rather than build every piece from scratch as I usually do, I used PIXI.js to "help" (wasn't any easier) with rendering sprites and loading assets.
  - The client code was written in Typescript

- Flow of data
  - Client logs in, receives a JWT, passes the JWT on all future requests
  - Each "Spin", the client asks the server for results. Client has no logic or control of their own fate. Server builds a board, evaluates it, and returns the results. This is muuuuuch more tamper proof than all logic being in javascript, where the user can manipulate it.

## Art

I made the art by creating 3d things in blender, and taking 2d renders of them. I drew a couple things (the ocean painting) in Krita.

`Current progress (looks very blocky, but will look much better by the end)`

<img src="./readme/progress.png" />

<table>
  <tbody>
    <tr>
    <td>
      <img src="./graphics/blender/Treasure%20Map/Treasure%20Map%20Render.png" width="300" height="300" />
    </td>
    <td>
      <img src="./graphics/blender/Compass/Compass%20Render.png" width="300" height="300" />
    </td>
    </tr>
    <tr>
    <td>
      <img src="./graphics/blender/Anchor/Anchor%20Render.png" width="300" height="300" />
    </td>
    <td>
      <img src="./graphics/blender/PictureFrame/render.png" width="300" height="300" />
    </td>
    </tr>
  </tbody>
</table>