import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    user: String
}

export const NoteSchema = SchemaFactory.createForClass(Note);