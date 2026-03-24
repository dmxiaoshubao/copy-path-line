import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    kotlin("jvm") version "2.1.20"
    id("org.jetbrains.intellij.platform") version "2.13.1"
}

group = providers.gradleProperty("pluginGroup").get()
version = providers.gradleProperty("pluginVersion").get()

repositories {
    mavenCentral()
    intellijPlatform {
        defaultRepositories()
    }
}

dependencies {
    intellijPlatform {
        create(
            providers.gradleProperty("platformType"),
            providers.gradleProperty("platformVersion"),
        )
    }

    testImplementation(kotlin("test"))
}

kotlin {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

intellijPlatform {
    pluginConfiguration {
        id = providers.gradleProperty("pluginGroup")
        name = "Copy Path Line"
        version = providers.gradleProperty("pluginVersion")
        description = """
            Copy the current file path with line numbers from JetBrains IDEs.
            Supports both relative and absolute paths, multi-caret selections, and compact line ranges such as 1-3,5-6,8-11.
        """.trimIndent()
        changeNotes = """
            <ul>
              <li>Initial JetBrains IDE plugin release.</li>
              <li>Copy relative path with line numbers.</li>
              <li>Copy absolute path with line numbers.</li>
              <li>Support editor popup menu and default shortcut for relative copy.</li>
            </ul>
        """.trimIndent()
        ideaVersion {
            sinceBuild = "233"
            untilBuild = provider { null }
        }
        vendor {
            name = "dmxiaoshubao"
            email = "dmxiaoshubao@126.com"
            url = "https://github.com/dmxiaoshubao"
        }
    }
}

tasks {
    wrapper {
        gradleVersion = "9.0.0"
    }

    test {
        useJUnitPlatform()
    }
}
