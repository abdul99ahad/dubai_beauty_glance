import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "decodeHtmlEntitiesPipe" })
export class DecodeHtmlEntitiesPipe implements PipeTransform {
  public transform(value: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = value;
    const decodedHtml = txt.value;
    txt.remove();
    return decodedHtml;
  }
}
