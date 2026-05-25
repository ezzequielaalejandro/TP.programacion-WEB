/* =====================================================
   ================= LISTA PERSONAJES ==================
   ===================================================== */

const characters = {

    MrOpams:{
        hp:100,
        mana:100,
        speed:6,
        jump:18,
        punch:10,
        kick:15,
        fireball:20
    },

    subzero:{
        hp:120,
        mana:80,
        speed:5,
        jump:15,
        punch:14,
        kick:18,
        fireball:16
    },

    reptile:{
        hp:90,
        mana:120,
        speed:8,
        jump:20,
        punch:8,
        kick:12,
        fireball:25
    },

    raiden:{
        hp:110,
        mana:100,
        speed:6,
        jump:17,
        punch:12,
        kick:16,
        fireball:22
    },

    kitana:{
        hp:95,
        mana:110,
        speed:7,
        jump:19,
        punch:9,
        kick:13,
        fireball:24
    },

    liu:{
        hp:100,
        mana:100,
        speed:7,
        jump:18,
        punch:11,
        kick:17,
        fireball:20
    },

    kano:{
        hp:130,
        mana:70,
        speed:4,
        jump:13,
        punch:17,
        kick:20,
        fireball:14
    },

    jax:{
        hp:140,
        mana:60,
        speed:4,
        jump:12,
        punch:20,
        kick:22,
        fireball:10
    },

    mileena:{
        hp:90,
        mana:120,
        speed:8,
        jump:21,
        punch:8,
        kick:14,
        fireball:26
    },

    smoke:{
        hp:100,
        mana:100,
        speed:7,
        jump:18,
        punch:10,
        kick:16,
        fireball:21
    }
};

/* =====================================================
   ================= VARIABLES =========================
   ===================================================== */

let selectedP1 = null;
let selectedP2 = null;

const p1Grid = document.getElementById("p1Characters");
const p2Grid = document.getElementById("p2Characters");

/* =====================================================
   ================= SELECTOR ==========================
   ===================================================== */

Object.keys(characters).forEach(name=>{

    const c1 = document.createElement("div");

    c1.classList.add("characterCard");

    c1.innerText = name.toUpperCase();

    c1.onclick = ()=>{

        selectedP1 = name;

        document.querySelectorAll("#p1Characters .characterCard")
        .forEach(x=>x.classList.remove("selected"));

        c1.classList.add("selected");
    };

    p1Grid.appendChild(c1);

    const c2 = document.createElement("div");

    c2.classList.add("characterCard");

    c2.innerText = name.toUpperCase();

    c2.onclick = ()=>{

        if(name === selectedP1){

            alert("NO SE PUEDE REPETIR");

            return;
        }

        selectedP2 = name;

        document.querySelectorAll("#p2Characters .characterCard")
        .forEach(x=>x.classList.remove("selected"));

        c2.classList.add("selected");
    };

    p2Grid.appendChild(c2);
});

/* =====================================================
   ================= START GAME ========================
   ===================================================== */

document.getElementById("startBtn").onclick = ()=>{

    if(!selectedP1 || !selectedP2){

        alert("SELECCIONA PERSONAJES");

        return;
    }

    document.getElementById("characterSelect")
    .style.display = "none";

    document.getElementById("game")
    .style.display = "block";

    startGame();
};

/* =====================================================
   ================= START GAME ========================
   ===================================================== */

function startGame(){

    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");

    const stats1 = characters[selectedP1];
    const stats2 = characters[selectedP2];

    let hp1 = stats1.hp;
    let hp2 = stats2.hp;

    let mana1 = stats1.mana;
    let mana2 = stats2.mana;

    let p1x = 200;
    let p2x = 1000;

    let p1y = 0;
    let p2y = 0;

    let velY1 = 0;
    let velY2 = 0;

    const gravity = 1;

    let p1State = "idle";
    let p2State = "idle";

    let canFireball1 = true;
    let canFireball2 = true;

    const keys = {};

    /* =================================================
       ================= SPRITES =======================
       ================================================= */

    function setSprite(player,state){

        if(player === 1){

            p1.style.backgroundImage =
            `url('sprites/${selectedP1}/${state}.png')`;

        }else{

            p2.style.backgroundImage =
            `url('sprites/${selectedP2}/${state}.png')`;
        }
    }

    setSprite(1,"idle");
    setSprite(2,"idle");

    /* =================================================
       ================= DAMAGE ========================
       ================================================= */

    function damage(target,amount){

        if(target === 1){

            if(p1State === "block") amount *= 0.2;

            hp1 -= amount;

            if(hp1 < 0) hp1 = 0;

            document.getElementById("health1")
            .style.width =
            (hp1 / stats1.hp * 100) + "%";

            if(hp1 <= 0){

                alert("PLAYER 2 WINS");
            }

        }else{

            if(p2State === "block") amount *= 0.2;

            hp2 -= amount;

            if(hp2 < 0) hp2 = 0;

            document.getElementById("health2")
            .style.width =
            (hp2 / stats2.hp * 100) + "%";

            if(hp2 <= 0){

                alert("PLAYER 1 WINS");
            }
        }
    }

    /* =================================================
       ================= PUNCH =========================
       ================================================= */

    function punch(attacker){

        let distance = Math.abs(p1x - p2x);

        if(attacker === 1){

            p1State = "punch";

            setSprite(1,"punch");

            if(distance < 180){

                damage(2,stats1.punch);
            }

        }else{

            p2State = "punch";

            setSprite(2,"punch");

            if(distance < 180){

                damage(1,stats2.punch);
            }
        }

        setTimeout(()=>{

            if(attacker === 1){

                p1State = "idle";

                setSprite(1,"idle");

            }else{

                p2State = "idle";

                setSprite(2,"idle");
            }

        },180);
    }

    /* =================================================
       ================= KICK ==========================
       ================================================= */

    function kick(attacker){

        let distance = Math.abs(p1x - p2x);

        if(attacker === 1){

            p1State = "kick";

            setSprite(1,"kick");

            if(distance < 220){

                damage(2,stats1.kick);
            }

        }else{

            p2State = "kick";

            setSprite(2,"kick");

            if(distance < 220){

                damage(1,stats2.kick);
            }
        }

        setTimeout(()=>{

            if(attacker === 1){

                p1State = "idle";

                setSprite(1,"idle");

            }else{

                p2State = "idle";

                setSprite(2,"idle");
            }

        },220);
    }

    /* =================================================
       ================= JUMP ==========================
       ================================================= */

    function jump(player){

        if(player === 1 && p1y === 0){

            velY1 = stats1.jump;

            p1State = "jump";

            setSprite(1,"jump");
        }

        if(player === 2 && p2y === 0){

            velY2 = stats2.jump;

            p2State = "jump";

            setSprite(2,"jump");
        }
    }

    /* =================================================
       ================= FIREBALL ======================
       ================================================= */

    function fireball(attacker){

        if(attacker === 1){

            if(mana1 < 25 || !canFireball1) return;

            mana1 -= 25;

            canFireball1 = false;

            p1State = "fireball";

            setSprite(1,"fireball");

        }else{

            if(mana2 < 25 || !canFireball2) return;

            mana2 -= 25;

            canFireball2 = false;

            p2State = "fireball";

            setSprite(2,"fireball");
        }

        const ball = document.createElement("div");

        ball.classList.add("fireball");

        if(attacker === 1){

            ball.style.backgroundImage =
            `url('sprites/${selectedP1}/projectile.png')`;

        }else{

            ball.style.backgroundImage =
            `url('sprites/${selectedP2}/projectile.png')`;
        }

        document.getElementById("game")
        .appendChild(ball);

        let x;
        let dir;

        /* =========================================
   ========= DIRECCION DINAMICA =============
   ========================================= */

if(attacker === 1){

    /*
    SI P1 ESTA A LA IZQUIERDA
    DISPARA A LA DERECHA
    */

    if(p1x < p2x){

        x = p1x + 120;

        dir = 1;

    }else{

        /*
        SI ESTA A LA DERECHA
        DISPARA A LA IZQUIERDA
        */

        x = p1x - 50;

        dir = -1;
    }

}else{

    if(p2x < p1x){

        x = p2x + 120;

        dir = 1;

    }else{

        x = p2x - 50;

        dir = -1;
    }
}a

        ball.style.left = x + "px";
        ball.style.bottom = "260px";

        const interval = setInterval(()=>{

            x += 14 * dir;

            ball.style.left = x + "px";

            if(attacker === 1){

                if(Math.abs(x - p2x) < 90){

                    damage(2,stats1.fireball);

                    clearInterval(interval);

                    ball.remove();
                }

            }else{

                if(Math.abs(x - p1x) < 90){

                    damage(1,stats2.fireball);

                    clearInterval(interval);

                    ball.remove();
                }
            }

            if(x < -200 ||
               x > window.innerWidth + 200){

                clearInterval(interval);

                ball.remove();
            }

        },16);

        setTimeout(()=>{

            if(attacker === 1){

                p1State = "idle";

                setSprite(1,"idle");

                canFireball1 = true;

            }else{

                p2State = "idle";

                setSprite(2,"idle");

                canFireball2 = true;
            }

        },500);
    }

    /* =================================================
       ================= CONTROLES =====================
       ================================================= */

    document.addEventListener("keydown",(e)=>{

        keys[e.key.toLowerCase()] = true;

        const key = e.key.toLowerCase();

        if(key === "f") punch(1);
        if(key === "g") kick(1);
        if(key === "r") fireball(1);
        if(key === "w") jump(1);

        if(key === "l") punch(2);
        if(key === "k") kick(2);
        if(key === "o") fireball(2);
        if(key === "arrowup") jump(2);
    });

    document.addEventListener("keyup",(e)=>{

        keys[e.key.toLowerCase()] = false;
    });

    /* =================================================
       ================= LOOP ==========================
       ================================================= */

    function loop(){

        /* PLAYER 1 */

        if(keys["a"]){

            p1x -= stats1.speed;

            if(p1State === "idle"){

                p1State = "walk";

                setSprite(1,"walk");
            }

        }else if(keys["d"]){

            p1x += stats1.speed;

            if(p1State === "idle"){

                p1State = "walk";

                setSprite(1,"walk");
            }

        }else if(keys["s"]){

            p1State = "crouch";

            setSprite(1,"crouch");

        }else if(keys["q"]){

            p1State = "block";

            setSprite(1,"block");

        }else if(
            p1State !== "punch" &&
            p1State !== "kick" &&
            p1State !== "fireball" &&
            p1State !== "jump"
        ){

            p1State = "idle";

            setSprite(1,"idle");
        }

        /* PLAYER 2 */

        if(keys["arrowleft"]){

            p2x -= stats2.speed;

            if(p2State === "idle"){

                p2State = "walk";

                setSprite(2,"walk");
            }

        }else if(keys["arrowright"]){

            p2x += stats2.speed;

            if(p2State === "idle"){

                p2State = "walk";

                setSprite(2,"walk");
            }

        }else if(keys["arrowdown"]){

            p2State = "crouch";

            setSprite(2,"crouch");

        }else if(keys["u"]){

            p2State = "block";

            setSprite(2,"block");

        }else if(
            p2State !== "punch" &&
            p2State !== "kick" &&
            p2State !== "fireball" &&
            p2State !== "jump"
        ){

            p2State = "idle";

            setSprite(2,"idle");
        }

        /* GRAVEDAD */

        velY1 -= gravity;
        velY2 -= gravity;

        p1y += velY1;
        p2y += velY2;

        if(p1y < 0){

            p1y = 0;

            velY1 = 0;

            if(p1State === "jump"){

                p1State = "idle";

                setSprite(1,"idle");
            }
        }

        if(p2y < 0){

            p2y = 0;

            velY2 = 0;

            if(p2State === "jump"){

                p2State = "idle";

                setSprite(2,"idle");
            }
        }

        /* POSICIONES */

        p1.style.left = p1x + "px";
        p2.style.left = p2x + "px";

        /* =========================================
   ========= AUTO DIRECCION =================
   ========================================= */

/*
SI PLAYER 1 ESTA A LA IZQUIERDA
MIRA HACIA LA DERECHA
*/

if(p1x < p2x){

    p1.style.transform = "scaleX(1)";
    p2.style.transform = "scaleX(-1)";

}else{

    /*
    SI PLAYER 1 PASA AL OTRO LADO
    SE INVIERTEN
    */

    p1.style.transform = "scaleX(-1)";
    p2.style.transform = "scaleX(1)";
}

        p1.style.bottom = (140 + p1y) + "px";
        p2.style.bottom = (140 + p2y) + "px";

        /* MANA */

        mana1 += 0.08;
        mana2 += 0.08;

        if(mana1 > stats1.mana)
            mana1 = stats1.mana;

        if(mana2 > stats2.mana)
            mana2 = stats2.mana;

        document.getElementById("mana1")
        .style.width =
        (mana1 / stats1.mana * 100) + "%";

        document.getElementById("mana2")
        .style.width =
        (mana2 / stats2.mana * 100) + "%";

        requestAnimationFrame(loop);
    }

    loop();
}