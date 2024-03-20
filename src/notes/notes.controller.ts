import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { Note } from "./Schema/notes.schema";
import { CreateNoteDto } from "./dto/createnote.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller('notes')
export class NotesController {

    constructor(private noteService: NotesService) { }

    @Get()
    findAll(@Request() req): Promise<Note[]> {
        // console.log(JSON.stringify(req.user))
        return this.noteService.findAll(req);
    }

    @Post()
    addNote(@Body() createNoteDto: CreateNoteDto, @Request() req) {
        return this.noteService.create(createNoteDto, req);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() createNoteDto: CreateNoteDto) {
        return this.noteService.update(id, createNoteDto);
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        return this.noteService.remove(id);
    }

}