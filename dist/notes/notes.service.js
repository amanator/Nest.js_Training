"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const notes_schema_1 = require("./Schema/notes.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const createnote_dto_1 = require("./dto/createnote.dto");
let NotesService = class NotesService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    create(CreateNoteDto, req) {
        try {
            const model = new this.noteModel();
            model.title = CreateNoteDto.title;
            model.description = CreateNoteDto.description;
            model.user = req.user.id;
            return model.save();
        }
        catch (error) {
            throw new common_1.HttpException({ error: 'Internal Server Error' }, 400);
        }
    }
    findAll(req) {
        try {
            return this.noteModel.find({ user: req.user.id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ error: 'Internal Server Error' }, 400);
        }
    }
    update(id, CreateNoteDto) {
        try {
            return this.noteModel.updateOne({ _id: id }, {
                title: CreateNoteDto.title,
                description: CreateNoteDto.description
            }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ error: 'Internal Server Error' }, 400);
        }
    }
    remove(id) {
        try {
            return this.noteModel.deleteOne({ _id: id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ error: 'Internal Server Error' }, 400);
        }
    }
};
exports.NotesService = NotesService;
__decorate([
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createnote_dto_1.CreateNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NotesService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesService.prototype, "findAll", null);
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notes_schema_1.Note.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotesService);
//# sourceMappingURL=notes.service.js.map