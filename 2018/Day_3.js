
var claims = [[1,2,3,4],[5,6,7,8]];//Claims should be an array of arrays, of which have x, y, width, and height

//sample should equal 2
// claims = [[1,3, 4,4],[3, 1, 4,4],[5, 5, 2,2]];

//Make an X by Y size grid
const gridSizeX = 1000;
const gridSizeY = 1000;

var grid = new Array(gridSizeX);

for (var i=0; i<gridSizeX; i++) {
    grid[i] = new Array(gridSizeY);
}

const findOverlap = () => {
    //Painting the grid - 1000 by 1000 surface area, mark each index covered
    claims.forEach(claim => {
        var x = claim[0];
        var y = claim[1];
        var width = claim[2];
        var height = claim[3];

        for (var i=x; i<x+width; i++) {
            for (var j=y; j<y+height; j++) {
                if (grid[i][j] == 'claimed') {
                    grid[i][j] = 'overlap';
                }

                if (!grid[i][j]) {
                    grid[i][j] = 'claimed';
                }
            }
        }
    });

    var overlap = 0;

    for (var i=0; i<gridSizeX; i++) {
        for (var j=0; j<gridSizeY; j++) {

            if (grid[i][j] == 'overlap') {
                overlap++;
            }
        }
    }

    console.log('Claimed material: ');console.log(overlap);
}

// findOverlap();


//Need to find the ID of the claim with no overlap (didn't include ID in source, but the order was maintained...)
const findUntouchedClaim = () => {
    claims.forEach((claim, ID) => {//index is zero based, so actual result is ID++
        var x = claim[0];
        var y = claim[1];
        var width = claim[2];
        var height = claim[3];

        for (var i=x; i<x+width; i++) {
            for (var j=y; j<y+height; j++) {
                if (grid[i][j] && grid[i][j].value == 'claimed') {
                    grid[i][j].value = 'overlap';
                    grid[i][j].ID = 'multiple claims';
                }

                if (!grid[i][j]) {
                    grid[i][j] = {};
                    grid[i][j].value = 'claimed';
                    grid[i][j].ID = ID;
                }
            }
        }
    });
    
    claims.forEach(claim => {
        var x = claim[0];
        var y = claim[1];
        var width = claim[2];
        var height = claim[3];

        var hasAnyOverwritten = false;
        var ID = '';

        for (var i=x; i<x+width; i++) {
            for (var j=y; j<y+height; j++) {
                //if all are not 'multiple claims', winner
                ID = grid[i][j].ID;
                if (grid[i][j].ID == 'multiple claims') {
                    hasAnyOverwritten = true;
                }
            }
        }

        if (!hasAnyOverwritten) {
            console.log('Found the winner: ');console.log(ID+1);
        }
    });
}
findUntouchedClaim();