class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr){
        this.array = arr;
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
        this.preorderData = [];
        this.inorderData = [];
        this.postorderData = [];
    }
    buildTree(array, start, end){
        if(start > end ) return null;

        let mid = parseInt((start + end)/2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, root = this.root) {
        if (root == null) {
          return (root = new Node(value));
        }
    
        if (root.data < value) {
          root.right = this.insert(value, root.right);
        } 
        else {
          root.left = this.insert(value, root.left);
        }
    
        return root;
    }
    
    delete(value, root = this.root){
        if (root == null) {
            return root;
        }
        
        if(value < root.data){
            root.left = this.delete(value, root.left);
        }
        else if(value > root.data){
            root.right = this.delete(value, root.right);
        }
        else{
            if(root.left == null){
                return root.right;
            }
            else if(root.right == null){
                return root.left;
            }

            root.data = minValue(root.right);

            root.right = this.delete(root.data, root.right);
        }
        return root;
    }

    find(value, root = this.root){
        if(root == null){
            return root;
        }

        if(value == root.data){
            return root;
        }
        else if(value > root.data){
            return this.find(value, root.right)
        }
        else {
            return this.find(value, root.left);
        }
    }

    levelOrder(root = this.root){
        if(root == null){
            return root;
        }

        let arr = [];
        let result = [];
        arr.push(root);
        while(arr.length != 0){
            let first = arr.shift();
            result.push(first);

            if(first.left != null){
                arr.push(first.left);
            }
            if(first.right != null){
                arr.push(first.right);
            }
        }
        return result;
    }

    preorder(root) {
        if(root == null) return;
        
        if(root.data !== undefined) {
            this.preorderData.push(root.data);
        }

        if(root.left !== null) {
          this.preorder(root.left);
        }

        if(root.right !== null) {
          this.preorder(root.right);
        }
    }

    inorder(root) {
        if(root == null) return;
    
        if(root.left !== null) {
          this.inorder(root.left);
        }
    
        if(root.data !== undefined) {
          this.inorderData.push(root.data);
        }
    
        if(root.right !== null) {
          this.inorder(root.right);
        }
    }

    postorder(root) {
        if(root == null) return;
    
        if(root.left !== null) {
            this.postorder(root.left);
        }
        if(root.right !== null) {
            this.postorder(root.right);
        }
        if(root.data !== undefined) {
            this.postorderData.push(root.data);
        }
    }
    height(root = this.root){
        if(root == null){
            return -1;
        }
        else{
            let left = this.height(root.left);
            let right = this.height(root.right);

            return Math.max(left, right) + 1;
        }
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function minValue(root) {
    let min = root.data;
    while (root != null) {
      min = root.data;
      root = root.left;
    }
    return min;
}

let arr = [1, 2, 3, 4, 5, 6, 7];

let tree = new Tree(arr);

prettyPrint(tree.root);

tree.insert(8);
prettyPrint(tree.root);

tree.delete(8);
prettyPrint(tree.root);

tree.delete(4);
prettyPrint(tree.root);

console.log(tree.find(1));

let lo = tree.levelOrder();
let vals = lo.map(x => x.data);
console.log(vals);

tree.preorder(tree.root);
console.log(tree.preorderData);

tree.inorder(tree.root);
console.log(tree.inorderData);

tree.postorder(tree.root);
console.log(tree.postorderData);




