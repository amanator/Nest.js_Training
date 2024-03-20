import { HttpException, Injectable, Request } from "@nestjs/common";
import { Note, NoteDocument } from "./Schema/notes.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import { CreateNoteDto } from "./dto/createnote.dto";


@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) { }

    create(CreateNoteDto: CreateNoteDto, @Request() req): Promise<Note> {
        try {
            const model = new this.noteModel();
            model.title = CreateNoteDto.title;
            model.description = CreateNoteDto.description;
            model.user = req.user.id
            return model.save();
        } catch (error) {
            throw new HttpException({ error: 'Internal Server Error' }, 400);
        }
    }

    findAll(@Request() req): Promise<Note[]> {
        try {
            return this.noteModel.find({ user: req.user.id }).exec();
        } catch (error) {
            throw new HttpException({ error: 'Internal Server Error' }, 400);
        }
    }

    update(id: string, CreateNoteDto: CreateNoteDto) {
        try {
            return this.noteModel.updateOne({ _id: id }, {
                title: CreateNoteDto.title,
                description: CreateNoteDto.description
            }).exec();

        } catch (error) {
            throw new HttpException({ error: 'Internal Server Error' }, 400);
        }

    }

    remove(id: string) {
        try {
            return this.noteModel.deleteOne({ _id: id }).exec();

        } catch (error) {
            throw new HttpException({ error: 'Internal Server Error' }, 400);
        }
    }

}