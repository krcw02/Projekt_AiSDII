

class Node {
    constructor(v,p,numbersOfNeighbours = 0,permutation = -1){
        this.vertex = v; // point (x,y)
        this.path = p; // array of points(x,y)
        this.numbersOfNeighbours = numbersOfNeighbours;
        this.permutation = permutation;
    }
}
function tCoord(x,y){
    const width = 128;
    return y * width + x;
}


export function createGraph(map, start) {

    let list = [];
    let queue = [];
    let visited = new Set();

    queue.push(new Node(start,[start]));
    while(queue.length){
        let node = queue.shift();
        let x = node.vertex[0];
        let y = node.vertex[1];
        let path = node.path;
        if(visited.has(tCoord(x,y))) continue;
        visited.add(tCoord(x,y));
        
        let numbersOfNeighbours = 0;
        // sprawdzamy czy mozemy isc w lewo
        if(x-1 >= 0 && map.blocks[tCoord(x-1,y)].id == 1){
            numbersOfNeighbours++;
            queue.push(new Node([x-1,y],[...path,[x-1,y]]));
        }
        // sprawdzamy czy mozemy isc w prawo
        if(x+1 < 128 && map.blocks[tCoord(x+1,y)].id == 1){
            numbersOfNeighbours++;
            queue.push(new Node([x+1,y],[...path,[x+1,y]]));
        }
        // sprawdzamy czy mozemy isc w gore
        if(y-1 >= 0 && map.blocks[tCoord(x,y-1)].id == 1){
            numbersOfNeighbours++;
            queue.push(new Node([x,y-1],[...path,[x,y-1]]));
        }
        // sprawdzamy czy mozemy isc w dol
        if(y+1 < 128 && map.blocks[tCoord(x,y+1)].id == 1){
            numbersOfNeighbours++;
            queue.push(new Node([x,y+1],[...path,[x,y+1]]));
        }
        list.push(new Node([x,y],path,numbersOfNeighbours, map.blocks[tCoord(x,y)].permutation));

    }
    console.log(list);  
    // convertToAdienceList(list);
    return list;

}


