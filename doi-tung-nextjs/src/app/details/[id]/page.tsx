import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

type DetailPageProps = {
    params: {
        id: string;
    }
};

export default async function DetailPage({ params }: DetailPageProps) {
    const { id } = params;

    // Sanitize the id to prevent directory traversal
    if (id.includes('..')) {
        notFound();
    }

    const filePath = path.join(process.cwd(), 'public', 'details', `${id}.html`);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // A simple way to extract the body content to avoid rendering the full HTML document
        const bodyMatch = fileContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const content = bodyMatch ? bodyMatch[1] : fileContent;

        return (
            <div dangerouslySetInnerHTML={{ __html: content }} />
        );
    } catch (error) {
        notFound();
    }
}

export async function generateStaticParams() {
    const detailsDirectory = path.join(process.cwd(), 'public', 'details');
    const files = await fs.readdir(detailsDirectory);

    return files.map((file) => ({
        id: file.replace(/\.html$/, ''),
    }));
}