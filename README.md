### Install instructions
Clone this repo, then install the following npm dependencies:

* npm install boardgame.io
* npm install --save-dev parcel-bundler
* npm install esm

### How to run

For the multiplayer version, run the following commands in separate terminals:
* npm run serve
* npm start

Open 4 browsers windows to localhost:1234

### TO DO

- [x] Bidding
- [x] Scoring
- [x] 30 for 60
- [x] No pegging past 100
- [x] Use suit symbols instead of H,D,C,S
- [x] UI: Bidding
- [x] UI: Declaration
- [x] UI: Discard
- [x] UI: Kitty
- [x] Move validation
- [x] Validate suit declaration
- [x] UI: Trick scoring
- [x] UI: Hand scoring
- [x] Bug: Ace of hearts not treated as trump when trump is lead (incorrect error of: you have to play trump)
- [ ] Bug: First three players passing makes player undefined
- [x] Bug: Declare phase comes after hand scoring?
- [x] Multiplayer clients
- [x] Hide hand secrets
- [ ] Automatic loss if you go 25 without the 5
- [ ] Game lobby
- [x] Deployment to Heroku
- [ ] Validate shuffling
- [ ] Fish suit names


