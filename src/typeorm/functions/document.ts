import { connect } from "../config";
import { Document } from "../entities/Document";

export const createOrUpdateDocument = async (
  userId: number,
  docName: string,
  value: Object
): Promise<Document | void> => {
  try {
    const connection = await connect();
    const docRepo = connection.getRepository(Document);

    const existingDocument: Document | null = await docRepo.findOne({
      where: { userId, docName },
    });

    let savedDocument: Document;
    if (!existingDocument) {
      const newDocument: Document = new Document();
      newDocument.docName = docName;
      newDocument.userId = userId;
      newDocument.docValue = value;
      newDocument.createdAt = new Date();

      savedDocument = await docRepo.save(newDocument);
    } else {
      const docValue: any = existingDocument.docValue;
      for (let key in value) {
        docValue[key] = (value as any)[key as string];
      }
      existingDocument.docValue = docValue;
      savedDocument = await docRepo.save(existingDocument);
    }

    return savedDocument;
  } catch (err) {
    console.error(err);
  }
};

export const getDocumentsByUserId = async (userId: number, docKey?: string) => {
  const connection = await connect();
  const docRepo = connection.getRepository(Document);

  const userDocuments = await docRepo.find({
    where: {
      userId,
      ...(docKey && { docName: docKey }),
    },
  });
  return userDocuments;
};
