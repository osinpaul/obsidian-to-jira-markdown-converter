import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
        <div class="container">
            <h2>Obsidian → Jira Markdown Converter</h2>
            <div class="editor">
                <textarea [(ngModel)]="obsidianMarkdown" (input)="convertMarkdown()"
                          placeholder="Введите Obsidian Markdown"></textarea>
                <textarea [value]="jiraMarkdown" readonly placeholder="Результат Jira Markdown"></textarea>
            </div>
        </div>
	`,
	styles: [`
        .container {
            max-width: 800px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
        }

        .editor {
            display: flex;
            gap: 10px;
        }

        textarea {
            width: 100%;
            height: 300px;
            padding: 10px;
            font-size: 14px;
            font-family: monospace;
        }
	`],
	imports: [
		FormsModule,
	],
})
export class AppComponent {
	obsidianMarkdown: string = '';
	jiraMarkdown: string = '';

	convertMarkdown() {
		let text = this.obsidianMarkdown.trim();

		// Убираем лишние пробелы и пустые строки
		text = text.replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n');

		// Заголовки
		text = text.replace(/^# (.*$)/gm, 'h1. $1');
		text = text.replace(/^## (.*$)/gm, 'h2. $1');
		text = text.replace(/^### (.*$)/gm, 'h3. $1');
		text = text.replace(/^#### (.*$)/gm, 'h4. $1');
		text = text.replace(/^##### (.*$)/gm, 'h5. $1');
		text = text.replace(/^###### (.*$)/gm, 'h6. $1');

		// Жирный и курсив
		text = text.replace(/\*\*(.*?)\*\*/g, '*$1*'); // **bold** → *bold*
		text = text.replace(/\*(.*?)\*/g, '_$1_'); // *italic* → _italic_

		// Кодовые блоки
		text = text.replace(/```([\s\S]+?)```/g, '{code}$1{code}'); // ```код``` → {code}код{code}
		text = text.replace(/`([^`]+)`/g, '{{$1}}'); // `код` → {{код}}

		// Списки
		text = text.replace(/^- /gm, '* '); // - item → * item
		text = text.replace(/^\d+\.\s/gm, '# '); // 1. item → # item

		// Ссылки
		text = text.replace(/\[(.*?)\]\((.*?)\)/g, '[$1|$2]'); // [Текст](ссылка) → [Текст|ссылка]

		// Изображения
		text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '!$2!'); // ![alt](url) → !url!

		// Переносы строк (убираем `<br>`, но не в таблицах)
		text = text.replace(/<br\s*\/?>/g, '\n');

		// Фикс: строки, начинающиеся с `!`, экранируем
		text = text.replace(/^\!\s*(.*)/gm, '\\! $1');

		// Таблицы
		text = text.replace(/\n\|(.+?)\|\n/g, (match) => {
			let rows = match.trim().split('\n').map(row => row.trim()).filter(row => row.length > 0);
			if (rows.length === 0) return match;

			return '\n' + rows
				.map((row, index) => {
					if (row.includes('---')) return ''; // Убираем строку с ---
					if (index === 0) return `||${row.replace(/\|/g, '||')}||`; // Заголовки
					return `|${row}|`; // Обычные строки
				})
				.filter(row => row.length > 0)
				.join('\n') + '\n';
		});

		this.jiraMarkdown = text;
	}
}
