-----------------------------------------------------------------------------------------------------------------------------

kung gusto mo mapagana thru electron, 
    1. type "node -v" (dapat may version yan. if wala, install mo node.js)
    2. type "npm -v" (dapat may version din. if wala, install mo npm. not sure how, check mo sa electron.js link)
    3. type "npm init"
    4. type "npm install --save-dev electron"

after nyan, dapat may node_modules na folder ka na

-----------------------------------------------------------------------------------------------------------------------------

kapag ayaw gumana ng preview pdf
    1. type "npm install pdf-lib" or "npm install --save pdf-lib" 
    2. check file loc nung pdf-lib if tama. usually nasa node_modules naman yun

-----------------------------------------------------------------------------------------------------------------------------

kung ayaw pa rin gumana, check mo kung yung folder mismo naka open sa compiler mo !! :>

-----------------------------------------------------------------------------------------------------------------------------

kapag gusto mo i-try gawing app, type mo 'to sa terminal:
    1. npm install --save-dev @electron-forge/cli
    2. npx electron-forge import
    3. npm run make

after niyan, may folder na mabubuo. "out" yung name tapos andon na rin si eSURO as an app dun sa folders don. yay! :D

-----------------------------------------------------------------------------------------------------------------------------
