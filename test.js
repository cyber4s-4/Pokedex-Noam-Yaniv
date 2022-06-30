"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_commonjs_1 = require("node-fetch-commonjs");
var PokemonComponent = /** @class */ (function () {
    function PokemonComponent(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    PokemonComponent.prototype.render = function () {
        var height = document.createElement('div');
        height.innerHTML = this.data.height;
        this.parent.appendChild(height);
        var weight = document.createElement('div');
        weight.innerHTML = this.data.weight;
        this.parent.appendChild(weight);
    };
    return PokemonComponent;
}());
function getEvoNames(clientSearch) {
    return __awaiter(this, void 0, void 0, function () {
        var evoNames, evolution, evolvesTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    evoNames = [];
                    return [4 /*yield*/, (0, node_fetch_commonjs_1["default"])("https://pokeapi.co/api/v2/evolution-chain/".concat(clientSearch, "/")).then(function (val) { return val.json(); })];
                case 1:
                    evolution = _a.sent();
                    evoNames.push(evolution.chain.species.name);
                    evolvesTo = evolution.chain.evolves_to;
                    while (evolvesTo.length) {
                        evoNames.push(evolvesTo[0].species.name);
                        evolvesTo = evolvesTo[0].evolves_to;
                    }
                    return [2 /*return*/, evoNames];
            }
        });
    });
}
var clientSearch = 'bulbasaur';
function renderData(clientSearch) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, dataOfPokemon;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_commonjs_1["default"])("https://pokeapi.co/api/v2/pokemon/".concat(clientSearch, "/"))];
                case 1:
                    result = _b.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _b.sent();
                    _a = {
                        height: data.height,
                        weight: data.weight,
                        types: data.types.map(function (type) { return type.type.name; }),
                        id: data.id
                    };
                    return [4 /*yield*/, getEvoNames(data.id)];
                case 3:
                    dataOfPokemon = (
                    // TODO : Fix problem of id that changes between id of pokemon and id of evolution.
                    _a.evolutionNames = _b.sent(),
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
renderData(clientSearch);
