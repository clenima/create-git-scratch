# Create Git Scratch


## 설정


설정파일 혹은 CLI를 통해서 다음 변수 리스트를 설정할 수 있다.

- `base_directory`


### File


설정파일의 위치는 `~/.config/clenima/clenima.toml`을 사용한다.


```toml
[create-git-scratch]
base-directory = "..."
```


### CLI


- `--base-directory BASE_DIRECTORY`


 디렉토리에 임의의 2개 단어로 구성된 이름의 새 git 저장소를 생성합니다.


## 사용법


```bash
bunx @clenima/create-git-scratch [OPTIONS] [IDEA]
```


## 목적


- 빠른 프로토타이핑이나 실험을 위한 임시 프로젝트 생성
- user/org가 결정되지 않은 초기 단계의 프로젝트 작업공간 제공
- 일관된 초기 설정으로 개발 시작 시간 단축


## 수행 작업


1. `base_directory` 디렉토리가 없으면 생성
2. 일자(YYYYmmdd)-형용사-명사 조합으로 고유한 프로젝트 이름 생성 (예: `20250301-bright-river`, `20231111-swift-mountain`)
3. 해당 이름의 디렉토리 생성
4. Git 저장소 초기화
5. 빈 `.gitignore` 파일 생성
6. 빈 `README.md` 파일 생성


## 생성되는 파일 구조


```
~/{base_directory}/{generated_name}/
├── .git/
├── .gitignore (empty file)
└── README.md (empty file)
```


## 명령어 완료 후


생성된 프로젝트의 경로와 이름을 출력하고, 해당 디렉토리로 이동할 수 있는 명령어를 제공합니다.


## 아직 미정 아이디어


명령어 입력을 하면 실제 패키지 코드 전후로 LLM hook도 고려해보자.
