"use strict";
exports.__esModule = true;
exports.PokemonComponent = void 0;
var PokemonComponent = /** @class */ (function () {
    function PokemonComponent(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    PokemonComponent.prototype.clear = function () {
        this.parent.innerHTML = '';
    };
    PokemonComponent.prototype.renderFullInfo = function () {
        var _a, _b;
        var IdDiv = document.createElement('div');
        IdDiv.innerText = 'Pokemon ID. :' + this.data.id;
        this.parent.appendChild(IdDiv);
        var heightDiv = document.createElement('div');
        heightDiv.innerText = 'Pokemon Height. :' + this.data.height;
        this.parent.appendChild(heightDiv);
        var weightDiv = document.createElement('div');
        weightDiv.innerText = 'Pokemon Weight. :' + this.data.weight;
        this.parent.appendChild(weightDiv);
        // types
        var typesContainer = document.createElement('div');
        typesContainer.className = 'typesContainer';
        (_a = this.data.types) === null || _a === void 0 ? void 0 : _a.forEach(function (type) {
            var typesDiv = document.createElement('div');
            var capitalizedType = type.type.name.toUpperCase(); // + type.type.name.substring(1);
            typesDiv.innerHTML = "\n            <div class=\"typeDiv ".concat(type.type.name, "\"><span>").concat(capitalizedType, "</span></div>");
            typesContainer.appendChild(typesDiv);
        });
        this.parent.appendChild(typesContainer);
        //image of pokemon
        var pokemonImage = document.createElement('img');
        pokemonImage.className = 'pokemonImageDiv';
        pokemonImage.src = this.data.higherQualityImgURL;
        this.parent.appendChild(pokemonImage);
        //stats
        var statsContainer = document.createElement('div');
        statsContainer.className = 'pokemonStatDiv';
        (_b = this.data.stats) === null || _b === void 0 ? void 0 : _b.forEach(function (stat) {
            var statDiv = document.createElement('div');
            statDiv.className = "".concat(stat.stat.name);
            statDiv.style.backgroundColor = 'red';
            statDiv.style.backgroundColor =
                "rgb(" + (20 + Math.floor(parseInt(stat.base_stat) * 250 / 256)) + ","
                    + (20 + Math.floor(255 - parseInt(stat.base_stat) * 250 / 256))
                    + ",30)";
            statDiv.style.height = Math.max(parseInt(stat.base_stat), 50) + 'px';
            statDiv.innerHTML = "<span>".concat(stat.stat.name, "<br>").concat(stat.base_stat, "</span>");
            statsContainer.appendChild(statDiv);
        });
        this.parent.appendChild(statsContainer);
    };
    PokemonComponent.prototype.renderEvolutions = function () {
        var _this = this;
        var evoDiv = document.createElement('div');
        evoDiv.classList.add('pokemonBox');
        var imgElement = document.createElement('img');
        imgElement.classList.add('pokemonImageDiv');
        imgElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(this.data.id, ".png");
        evoDiv.appendChild(imgElement);
        var entryDiv = document.createElement('h3');
        //add zeros to the number
        var numberString = '#' + '0'.repeat(3 - this.data.id.toString().length) + this.data.id;
        entryDiv.innerText = numberString;
        evoDiv.appendChild(entryDiv);
        var nameDiv = document.createElement('h2');
        nameDiv.innerText = this.data.name.charAt(0).toUpperCase() + this.data.name.slice(1);
        evoDiv.appendChild(nameDiv);
        evoDiv.addEventListener('click', function () {
            window.location.href = "http://localhost:4000/?pokemon=".concat(_this.data.name);
        });
        this.parent.appendChild(evoDiv);
    };
    PokemonComponent.prototype.renderMiniInfo = function () {
        var _this = this;
        this.parent.classList.add('pokemonContainer');
        var pokeDiv = document.createElement('div');
        pokeDiv.classList.add('pokemonBox');
        pokeDiv.addEventListener('click', function () {
            window.location.href = "http://localhost:4000/?pokemon=".concat(_this.data.name);
        });
        //create pokemon image DOM element
        var imgElement = document.createElement('img');
        imgElement.classList.add('pokemonImageDiv');
        imgElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(this.data.id, ".png");
        pokeDiv.appendChild(imgElement);
        //create pokemon entry_number DOM element
        var entryDiv = document.createElement('h3');
        //add zeros to the number
        var numberString = '#' + '0'.repeat(3 - this.data.id.toString().length) + this.data.id;
        entryDiv.innerText = numberString;
        pokeDiv.appendChild(entryDiv);
        //create pokemon name DOM element
        var nameDiv = document.createElement('h2');
        nameDiv.innerText = this.data.name.charAt(0).toUpperCase() + this.data.name.slice(1);
        pokeDiv.appendChild(nameDiv);
        this.parent.appendChild(pokeDiv);
    };
    return PokemonComponent;
}());
exports.PokemonComponent = PokemonComponent;
