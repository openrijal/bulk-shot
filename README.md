# bulk-shot
 a simple utility to get PhantomJS and SlimerJS screenshots providing a list of urls in a file

# installation

## install npm dependencies

`npm install`

# running the package

## run phantom screenshot

`phantomjs phanshot.js`

## run slimer screenshot

`slimerjs slimshot.js`

# running slimerjs in headless mode

## install Xvfb

### Debian Based

`apt-get install xvfb`

### RPM Based

`yum install xorg-X11-server-Xvfb`

## run slimer in Xvfb

`xvfb-run slimerjs slimshot.js`
