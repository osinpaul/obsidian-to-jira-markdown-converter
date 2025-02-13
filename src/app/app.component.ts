import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	obsidianMarkdown: string = '';
	jiraMarkdown: string = '';

	convertMarkdown() {
		let text = this.obsidianMarkdown;

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

		// Код
		text = text.replace(/`(.*?)`/g, '{{$1}}'); // `код` → {{код}}

		// Списки
		text = text.replace(/^- /gm, '* '); // - item → * item
		text = text.replace(/^\d+\. /gm, '# '); // 1. item → # item

		// Ссылки
		text = text.replace(/\[(.*?)\]\((.*?)\)/g, '[$1|$2]'); // [Текст](ссылка) → [Текст|ссылка]

		// Изображения
		text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '!$2!'); // ![alt](url) → !url!

		// Переносы строк (удаляем двойные переводы строк, оставляя одинарные)
		text = text.replace(/\n{3,}/g, '\n\n');

		// Таблицы
		text = text.replace(/\|(.+?)\|/g, (match) => {
			let rows = match.split('\n').map(row => row.trim()).filter(row => row.length > 0);
			if(rows.length === 0) return match;

			return rows
				.map((row, index) => {
					if(index === 0) return `||${ row.replace(/\|/g, '||') }||`; // Заголовки
					return `|${ row }|`; // Обычные строки
				})
				.join('\n');
		});

		this.jiraMarkdown = text;
	}
}
