new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gamePlaying: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gamePlaying = true;
            this.resetHealth();
        },
        attack: function(){  
            let damage = this.calculateDamage(3, 10);                       
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.winCheck()){                
                return;
            }
            this.monsterAttack();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        specialAttack: function(){  
            let damage = this.calculateDamage(10, 20);         
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if(this.winCheck()){                
                return;
            }
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <= 90)
                this.playerHealth += 10;
            else 
                this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals from damage of 10'
            });
        },
        monsterAttack: function(){                
            let damage = this.calculateDamage(5, 12);                             
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.winCheck(); 
        },
        winCheck: function(){
            if(this.monsterHealth <= 0){
                alert("You won!");
                this.endGame();
                return true;
            } else if(this.playerHealth <= 0){
                alert("You lose!");
                this.endGame();
                return true;
            }  else 
            return false;
        },
        resetHealth: function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        endGame: function(){
            this.gamePlaying = false;  
            this.resetHealth();          
        }       
    } 
});