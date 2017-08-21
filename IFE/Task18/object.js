 var queue = {
        str: [],
        
        leftPush: function(num) {
            this.str.unshift(num);
            this.paint();
        },
        
        rightPush: function(num) {
            this.str.push(num);
            this.paint();
        },
        
        isEmpty: function() {
            return (this.str.length == 0);
        },
        
        leftPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },
        
        rightPop: function() {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },
        
        paint: function() {
            var str = "";
            each(this.str, function(item){str += ("<div>" + parseInt(item) + "</div>")});
            container.innerHTML = str;
            addDivDelEvent();
        },
        
        deleteID: function(id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        }
        
    }